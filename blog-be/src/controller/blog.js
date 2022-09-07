const { exec } = require('../db/mysql')

const getList = (author, keyword, page, pagesize) => {

    let sql = `select * from blogs where 1=1 `;

    if (author) {
        sql += ` and author='${author}' `;
    }

    if (keyword) {
        sql += ` and title like '%${keyword}%' `;
    }

    sql += ` order by createtime desc `;

    if (page && pagesize) {
        let start_index = page * pagesize - pagesize
        sql +=` limit ${start_index}, ${pagesize} `
    }
    
    return exec(sql)
}

// 获取总条数
const getBlogsCount = (author, keyword) => {
    let sql = `select count(*) as total from blogs where 1=1 `;
    if (author) {
        sql += ` and author='${author}' `;
    }

    if (keyword) {
        sql += ` and title like '%${keyword}%' `;
    }
    return exec(sql).then(rows => {
        return rows[0]
    })
}

const getDetail = (id) => {
    let sql = `select * from blogs where id=${id}`;
    return exec(sql).then(rows => {
        return rows[0]
    })
}

const newBlog = (blogData = {}) => {
    const {
        title,
        content,
        author,
    } = blogData
    const createTime = new Date().getTime();

    let sql = `insert into blogs (title, content, createtime, author) values ('${title}', '${content}', ${createTime}, '${author}')`;

    return exec(sql).then(insertData => {

        return {
            id: insertData.insertId
        }
    })
}

const updatBlog = (id, blogData = {}) => {
    const {
        title,
        content,
    } = blogData;
    let sql = `update blogs set title='${title}', content='${content}' where id = ${id};`;

    return exec(sql).then(updateData => {
        return updateData.affectedRows > 0
    })
}

const deleteBlog = (id, author) => {
    let sql = `delete from blogs where id = ${id} and author = '${author}';`;

    return exec(sql).then(deleteData => {
        return deleteData.affectedRows > 0
    })
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updatBlog,
    deleteBlog,
    getBlogsCount
}