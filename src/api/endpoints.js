const { REACT_APP_BASE_API, REACT_APP_LOGIN_API, REACT_APP_SCRAPER_API } = process.env
export const apiEndpoints = {
    loginApi: `${REACT_APP_BASE_API}${REACT_APP_LOGIN_API}`,
    scraperApi: `${REACT_APP_BASE_API}${REACT_APP_SCRAPER_API}`
}