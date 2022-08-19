function SignUpServer(data: { [key: string]: string | File }) {
    var formData = new FormData();
    const token = localStorage.getItem("token");
    formData.append("position_id", '2');
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("photo", data.photo);
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set("Token", token ? token : "");
    return fetch("https://frontend-test-assignment-api.abz.agency/api/v1/users", {
        method: "POST",
        body: formData,
        headers: requestHeaders,
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            if (data.success) {
                return {"success": true}
            } else {
                return {"success": false}
            }
        })
        .catch(function (error) {
            console.error(error);
        });
}

export default SignUpServer;
