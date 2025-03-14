export function logoutService() {
    return fetch(import.meta.env.VITE_SNAPMART_API_URL + "/api/v1/logout", {
        method: 'POST',
        credentials: "include",
    })
}
