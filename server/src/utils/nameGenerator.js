export const usernameFromEmail = (email) => {
      if (!email || typeof email !== "string") {
          return "user_" + Math.random().toString(36).substring(2, 10);
            }

              // Extract part before @
                const base = email.split("@")[0];

                  // Remove weird characters
                    const cleanBase = base.replace(/[^a-zA-Z0-9]/g, "");

                      // Add entropy so usernames never collide
                        const suffix = Math.random().toString(36).substring(2, 6);

                          return `${cleanBase}_${suffix}`;
                          };