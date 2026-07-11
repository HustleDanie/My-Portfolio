Add a new blog post entry to the blog page.

Arguments: $ARGUMENTS

Parse the following from the arguments (ask if missing):
- **Post title**
- **Description** (1-2 sentences)
- **Link target** (an existing project page path like "/projects/my-project", or a new page to create)

Steps:

1. Read `app/blog/page.tsx` to understand the current blogPosts array shape.

2. Add a new entry to the `blogPosts` array with the correct shape, placed at the top (newest first).

3. If the link points to a project page that doesn't exist yet, inform the user and suggest using `/add-project` to create it first.
