const faker = require('faker');
const models = require('./models');
const owner = '5ced9ad434a4fc40f4b9accc';
const TurndownService = require('turndown');

module.export = () => {
    models.POST.remove().then(() => {
        Array.from({length: 20}).forEach(() => {
            const turndownService = new TurndownService();
            models.POST.create({
                title: faker.lorem.words(5),
                body: turndownService.turndown(faker.lorem.words(100)),
                owner
            }).then(console.log).catch(console.log )
        })
    }).catch(console.log)
}