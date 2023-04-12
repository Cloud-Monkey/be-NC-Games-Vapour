const db = require('../db/connection');

function fetchReviewsByCategory(category, sortBy, orderBy) {
    const greenTopics = [
        "review_id",
        "title",
        "category",
        "designer",
        "owner",
        "review_img_url",
        "created_at",
        "votescomment_count"
    ];
    const greenOrders = ['ASC', 'DESC'];

    // check if a sortBy has been given AND is not correct
    if (sortBy && !greenTopics.includes(sortBy)) {
        return Promise.reject({ status: 400, msg: "Invalid request!" });
    }
    // check if orderBy has been given AND is not correct
    if (orderBy && !greenOrders.includes(orderBy)) {
        return Promise.reject({ status: 400, msg: "Invalid request!" });
    }

    // set default sort to date if sort not given
    const defaultSort = sortBy ? `reviews.${sortBy}` : 'reviews.created_at';

    // set default orderBy to 'DESC'
    const defaultOrder = orderBy ? orderBy : 'DESC';

    let basePsql = `
        SELECT reviews.review_id,
            reviews.title,
            reviews.category,
            reviews.designer,
            reviews.owner,
            reviews.review_img_url,
            reviews.created_at,
            reviews.votes,
            CAST(COUNT(comments.review_id) AS INT) AS comment_count
        FROM reviews
        LEFT JOIN comments on reviews.review_id = comments.review_id
        WHERE reviews.category = $1
        GROUP BY reviews.review_id
        ORDER BY ${defaultSort} ${defaultOrder};
    `;

    const structureArr = [
        category,
    ];

    return db.query(
        basePsql,
        structureArr,
    ).then((review) => {
        if (review.rows.length === 0) {
            return Promise.reject({ status: 404, msg: "Error: not found" });
        };

        return review.rows;
    });
}

module.exports = fetchReviewsByCategory;
