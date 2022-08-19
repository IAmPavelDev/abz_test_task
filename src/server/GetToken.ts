async function getToken() {
    fetch("https://frontend-test-assignment-api.abz.agency/api/v1/token")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            localStorage.setItem("token", data.token);
        })
        .catch(function (error) { console.error(error)});
}

export default getToken;