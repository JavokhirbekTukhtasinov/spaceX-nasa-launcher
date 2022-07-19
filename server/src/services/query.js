
const getPagination = (query) => {
    const page = Math.abs(query.page) || 2;
    const limit = Math.abs(query.limit) || 20;
    const offset = (page - 1) * limit;
    return { limit, offset };
}


module.exports = {
    getPagination
};