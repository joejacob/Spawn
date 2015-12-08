Tasks = new Mongo.Collection("tasks");

/*TasksIndex = new EasySearch.Index({
    collection: Tasks,
    fields: ['name', 'description', 'host'],
    engine: new EasySearch.Minimongo({
        sort: function() {
            return ['timeU']
        }
    })
});*/