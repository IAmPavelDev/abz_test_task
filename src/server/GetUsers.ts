export const GetUsers = async (page:Number) => {
    const result = await fetch(
        `https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${page}&count=6`
    )
    .then(res => res.json());
    return result;
} 