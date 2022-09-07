interface ListInLine {
    user: string,
    keyword: string,
    page: number,
    count: number,
    pagesize: number
}

interface ListData {
    id: number,
    author: string,
    content: string,
    createtime: number,
    title: string
}

class BlogList {
    blogSearch: ListInLine = {
        user: '',
        keyword: '',
        page: 1,
        count: 0,
        pagesize: 2
    }
    blogData: ListData[] = []
}

export {
    ListInLine,
    ListData,
    BlogList
}