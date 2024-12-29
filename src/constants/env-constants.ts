export const ENV = {
  dev: {
    hub: 'https://dev-web-app-service.azurewebsites.net',
    node: 'https://dev-web-api-svc-node.azurewebsites.net',
  },
  preDev: {
    hub: 'https://pre-dev-web-app-service.azurewebsites.net',
    node: 'https://pre-dev-web-api-svc-node.azurewebsites.net',
  },
  qa: {
    hub: 'https://qa-app-service-global.azurewebsites.net',
    node: 'https://qa-app-service-node.azurewebsites.net',
  },
  prodUS: {
    hub: 'https://prod-eus-app-service-global.azurewebsites.net',
    node: 'https://prod-eus-app-service-node.azurewebsites.net',
  },
  prodSAR: {
    hub: 'https://prod-eus-app-service-global.azurewebsites.net',
    node: 'https://prod-sar-app-service-node.azurewebsites.net',
  },
  prodGCC: {
    hub: 'https://prod-eus-app-service-global.azurewebsites.net',
    node: 'https://prod-gcc-app-service-node.azurewebsites.net',
  },
};

export const getEnvironmentConfig = () => {
  const hostname = window.location.hostname;

  if (hostname.includes('predev.eservicepro.com')) {
    return ENV.preDev;
  } else if (hostname.includes('dev1.eservicepro.com')) {
    return ENV.dev;
  } else if (hostname.includes('qa.eservicepro.com')) {
    return ENV.qa;
  } else if (hostname.includes('uigcc.prod.eservicepro.com')) {
    return ENV.prodGCC;
  } else if (hostname.includes('uieus.prod.eservicepro.com')) {
    return ENV.prodUS;
  } else if (hostname.includes('uisar.prod.eservicepro.com')) {
    return ENV.prodSAR;
  }

  return ENV.qa;
};

export const config = getEnvironmentConfig();
