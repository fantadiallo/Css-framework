export default async function router(pathname = window.location.pathname) {
    console.log("Routing to:", pathname); // Log the pathname to debug
    
    switch (pathname) {
        case "/":
            await import("./views/auth.js");
            break;
        case "/feed":
            await import("../../feed.js");
            break;
        case "/profile":
            await import("./views/profile.js");
            break;
        case "/post":
            await import("./views/post.js"); // Make sure to import the correct module for posts
            break;
        default:
            console.warn("No route found for:", pathname);
            break;
    }
}
