export const endpoints = {

    auth: {
        register: "register",
        login: "login",
        update: "update-password"
    },

    cms: {
        hero: "banner",
        service: "service",
        team: "team",
        testimonial: "testimonial",
        blog: "allblog",
        search: "search",
        category: "showallcategory",
        recentpost: "letest-post",
        blogdetails: "blogdetails",
        like: "blog/like",
        unlike: "blog/unlike",
        commentlist: "comment",
        course: "course",
        contact: "contact/create"
    },

    crud: {
        addstudent: "student",
        allstudent: "allstudent",
        details: "edit",
        delete: "delete",
        edit: "update",
    }
}

export const myendpoints = [
    endpoints.cms.hero, //Index number 0
    endpoints.cms.service, //Index number 1
    endpoints.cms.team, //Index number 2
    endpoints.cms.testimonial, //Index number 3
    endpoints.cms.blog, //Index number 4
    endpoints.cms.search, //Index number 5
    endpoints.cms.category, //Index number 6
    endpoints.cms.recentpost, //Index number 7
    endpoints.cms.blogdetails, //Index number 8
    endpoints.cms.like, //Index number 9
    endpoints.cms.unlike, //Index number 10
    endpoints.cms.commentlist, //Index number 11
    endpoints.cms.course, //Index number 12
    endpoints.cms.contact, //Index number 13
    endpoints.auth.register, //Index number 14
    endpoints.auth.login, //Index number 15
    endpoints.auth.update, //Index number 16
    endpoints.crud.addstudent, //Index number 17
    endpoints.crud.allstudent, //Index number 18
    endpoints.crud.details, //Index number 19
    endpoints.crud.delete, //Index number 20
    endpoints.crud.edit, //Index number 21
]