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

export const successNotificationEndPoints = [
    endpoints.cms.hero,
    endpoints.cms.service,
    endpoints.cms.team,
    endpoints.cms.testimonial,
    endpoints.cms.blog,
    endpoints.cms.search,
    endpoints.cms.category,
    endpoints.cms.recentpost,
    endpoints.cms.blogdetails,
    endpoints.cms.like,
    endpoints.cms.unlike,
    endpoints.cms.commentlist,
    endpoints.cms.course,
    endpoints.cms.contact,
    endpoints.auth.register,
    endpoints.auth.login,
    endpoints.auth.update,
    endpoints.crud.addstudent,
    endpoints.crud.allstudent,
    endpoints.crud.details,
    endpoints.crud.delete,
    endpoints.crud.edit,
]