// api 로직
var users = [
    {
        id: 1,
        name: 'alice'
    }, {
        id: 2,
        name: 'bek'
    }, {
        id: 3,
        name: 'yeong'
    }
];

index = (req, res) => {
    req.query.limit = req.query.limit || 10;
    const limit = parseInt(req.query.limit, 10);
    if (Number.isNaN(limit)) {
        return res.status(400).end();
    }
    res.json(users.slice(0, limit));
}

show = (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) {
        return res.status(400).end();
    }
    const user = users.filter((user) => user.id === id)[0];
    if (!user) return res.status(404).end();
    res.json(user);
}


destroy = (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) {
        return res.status(400).end();
    }

    users = users.filter(user => user.id !== id)
    res.status(204).end();

}

create = (req, res) => {
    const name = req.body.name;
    if (!name) {
        return res.status(400).end();
    }
    const isConflict = users.filter(user => user.name === name).length;

    if (isConflict) {
        return res.status(409).end();
    }
    const id = Date.now();
    const user = { id, name };
    users.push(user);
    res.status(201).json(user);
}

update = (req, res) => {
    const id = parseInt(req.params.id, 10);

    if (Number.isNaN(id)) {
        return res.status(400).end();
    }
    const name = req.body.name;
    if (!name) {
        return res.status(400).end();
    }
    const isConflict = users.filter(user => user.name === name).length
    if (isConflict) {
        return res.status(409).end();
    }
    const user = users.filter(user => user.id === id)[0];

    if (!user) {
        return res.status(404).end();
    }

    user.name = name;
    res.json(user);
}
module.exports = {
    index,
    show,
    destroy,
    create,
    update
}

