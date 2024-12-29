//@ts-nocheck
import { useEffect, useRef, useCallback, useMemo } from 'react'
declare global {
  interface Window {
    google: typeof google
  }
}

const normalizeString = (str: string) => str.trim().replace(/[-_]/g, '').replace(/\s+/g, '').toLowerCase()

const appendToStreet = (street: string, componentName: string): string => {
  if (street && !street.includes(componentName)) {
    return `${street}, ${componentName}`.trim()
  }
  return componentName
}

const useGooglePlacesAutocomplete = () => {
  const addressInputRef = useRef<HTMLInputElement>(null)
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null)

  const finalCountry = 971
  const countryCode = useMemo(() => {
    if (finalCountry === 971) return ['ae'];
    if (finalCountry === 91) return ['in'];
    return ['us'];
  }, [finalCountry]);

  const handlePlaceChanged = useCallback(() => {
    const place = autocompleteRef.current?.getPlace()
    console.log(place, "dixker");
    
    if (!place || !place.address_components || !place.geometry) return

    const address = {
      street: '',
      city: '',
      state: '',
      country: '',
      zipcode: '',
      latitude: place.geometry.location?.lat() ?? 0,
      longitude: place.geometry.location?.lng() ?? 0,
    }

    place.address_components.forEach(({ types, long_name, short_name }: { types: string[]; long_name: string; short_name: string }) => {
      const componentType = types[0]

      switch (componentType) {
        case 'street_number':
          address.street = address.street ? `${long_name}, ${address.street}` : long_name
          break
        case 'route':
          address.street = appendToStreet(address.street, long_name)
          break
        case 'locality':
          address.city = long_name
          break
        case 'administrative_area_level_1':
          address.state = long_name
          break
        case 'country':
          address.country = long_name
          break
        case 'postal_code':
          address.zipcode = long_name
          break
        default:
          address.street = appendToStreet(address.street, long_name)
          break
      }
    })

    if (!address.city && address.state) {
      address.city = address.state
    } else if (!address.city && address.country) {
      address.city = address.country
    }
    const storedOptions = JSON.parse(localStorage.getItem('newCountryOptions') || '[]')
    const stateCode = storedOptions.find(
      (item: { code?: string; label: string }) =>
        item.code?.toLowerCase() === address.state.toLowerCase() || normalizeString(item.label).includes(normalizeString(address.state))
    )    
  }, [])

  useEffect(() => {
    const inputElement = addressInputRef.current

    if (!window.google || !inputElement) {
      if (inputElement) {
        inputElement.disabled = false
        inputElement.placeholder = 'Enter address'
        inputElement.style.background = ''
      }
      return
    }

    if (!autocompleteRef.current) {
      autocompleteRef.current = new window.google.maps.places.Autocomplete(inputElement, {
        types: ['geocode'],
        componentRestrictions: { country: countryCode },
      })
      autocompleteRef.current?.setFields(['address_components', 'formatted_address', 'geometry'])
      autocompleteRef.current?.addListener('place_changed', handlePlaceChanged)
    } else {
      autocompleteRef.current.setComponentRestrictions({ country: countryCode })
    }

    let wasFocused = false
    const observer = new MutationObserver(() => {
      if (inputElement.disabled) {
        inputElement.disabled = false
      }
      if (inputElement.placeholder !== 'Enter address') {
        inputElement.placeholder = 'Enter address'
      }
      if (inputElement.style.pointerEvents === 'none') {
        inputElement.style.pointerEvents = 'auto'
      }
      if (inputElement.getAttributeNames().includes('style') && inputElement.style.backgroundImage) {
        inputElement.style.backgroundImage = 'none'
      }
      if (!document.activeElement || document.activeElement !== inputElement) {
        if (wasFocused) {
          inputElement.focus()
          wasFocused = false 
        }
      }
    })

    const handleFocus = () => {
      wasFocused = true
    }
    inputElement.addEventListener('focus', handleFocus)

    observer.observe(inputElement, {
      attributes: true,
      attributeFilter: ['disabled', 'placeholder', 'style'],
    })

    return () => {
      observer.disconnect()
      inputElement.removeEventListener('focus', handleFocus)
    }
  }, [countryCode, handlePlaceChanged])

  return addressInputRef
}

export default useGooglePlacesAutocomplete
