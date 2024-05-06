// release.config.js converti en ES Module
export default {
    branches: [
        "main",  // Assurez-vous que le nom de la branche est correct
        { name: "beta", prerelease: true },
        { name: "alpha", prerelease: true }
    ],
};
