exports.config = {
    specs: ['todo-e2e-spec.ts'],
    directConnect: true,
    onPrepare: () => {
        require('ts-node').register({
            project: './tsconfig.json'
        });
    }
};