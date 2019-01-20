const NS = 'org.hackathon';
const factory = getFactory()

/**
 * @param {org.hackathon.ProcessRequest} tx The transaction instance.
    o Double participantsNumber
    o Double paymentPerSample
    o Requirement[] requirements
    o String company
 * @transaction
 */
async function processRequest(tx) {  // eslint-disable-line no-unused-vars
    const reqId = [
        tx.company, 
        tx.requirements[0].startDate,
        tx.requirements[0].endDate
    ].join('_');
    let request = factory.newResource(NS, 'Request', reqId);

    request.participantsNumber = tx.participantsNumber;
    request.paymentPerSample = tx.paymentPerSample;

    request.requirements = [factory.newConcept(NS, 'Requirement')];
    request.requirements[0].diagnostic = tx.requirements[0].diagnostic
    request.requirements[0].startDate = tx.requirements[0].startDate
    request.requirements[0].endDate = tx.requirements[0].endDate
    request.requirements[0].items = tx.requirements[0].items

    const companiesRegistry = await getParticipantRegistry(NS + '.Company');
    request.company = await companiesRegistry.get(tx.company);
    request.bundle = [];
    request.participants = [];

    const requestRegistry = await getAssetRegistry(NS + '.Request');
    await requestRegistry.add(request);
}

/**
 * @param {org.hackathon.RequestMatch} tx The transaction instance.
    --> Request request
    --> Individual individual
    o MatchStatus status
    o MedicalInformation data
 * @transaction
 */
async function requestMatch(tx) {  // eslint-disable-line no-unused-vars
    // if user says no => exit
    if (tx.status === 'NO') { return }

    // get request 
    const requestRegistry = await getAssetRegistry(NS + '.Request');
    let request = await requestRegistry.get(tx.request.getIdentifier());

    // add new data to the bundle
    const old_bundle = request.bundle.length > 0 ? request.bundle : []
    const items = request.requirements.reduce(
        function (a, b) {
            return [...a, ...b.items];
        },
        [],
    )
    const new_data = anonymizeData(tx.data, items);
    request.bundle = [...old_bundle, ...new_data];
    request.participants.push(tx.individual);

    // pay user
    const individualRegistry = await getParticipantRegistry(NS + '.Individual');
    let user = individualRegistry.get(tx.individual.getIdentifier());

    requestRegistry.update(request);
}


/**
 * @param {org.hackathon.SetupDemo} tx The transaction instance.
 * @transaction
 */
async function setupDemo(tx) {  // eslint-disable-line no-unused-vars
    const individuals = [
        factory.newResource(NS, 'Individual','USER_1'),
        factory.newResource(NS, 'Individual','USER_2'),
        factory.newResource(NS, 'Individual','USER_3'),
        factory.newResource(NS, 'Individual','USER_4'),
        factory.newResource(NS, 'Individual','USER_5'),
        factory.newResource(NS, 'Individual','USER_6'),
        factory.newResource(NS, 'Individual','USER_7'),
        factory.newResource(NS, 'Individual','USER_8'),
        factory.newResource(NS, 'Individual','USER_9'),
        factory.newResource(NS, 'Individual','USER_10')
    ].map(function (user) {
        user.claims = [];
        return user;
    });
    const companies = [
        factory.newResource(NS, 'Company', 'COMPANY_1'),
        factory.newResource(NS, 'Company', 'COMPANY_2')
    ]

    // let request = factory.newResource(NS, 'Request', 'REQUEST_1');
    // request.participantsNumber = 2;
    // request.paymentPerSample = 10;
    // let requirement = factory.newConcept(NS, 'Requirement');
    // requirement.diagnostic = 'diabetes';
    // requirement.startDate = '12/12/18';
    // requirement.endDate = '12/01/19';
    // requirement.items = ["cmm", "g/dL", "IU/L"];
    // request.requirements = [requirement];

    request.company = factory.newRelationship(NS, 'Company', tx.company)
    request.bundle = [];
    request.participants = [];

    const individualsRegistry = await getParticipantRegistry(NS + '.Individual');
    await individualsRegistry.addAll(individuals);

    const companiesRegistry = await getParticipantRegistry(NS + '.Company');
    await companiesRegistry.addAll(companies);

    // const requestsRegistry = await getAssetRegistry(NS + '.Request');
    // await requestsRegistry.add(request);
}

function anonymizeData(dataset, items) {
    privateInformations = ['name', 'firstname', 'sexe', 'birthdate'];
    console.log("@items", items);

    return dataset.filter(function (e) {
        return privateInformations.indexOf(e.key) === -1 && items.indexOf(e.key) > -1;
    });
}

/**
 *
 * @param {org.hackathon.DeleteData} deleteData - deleteData instance
 * @transaction
 */
async function deleteData(transaction) {  // eslint-disable-line no-unused-vars
    const userRegistry = await getParticipantRegistry(NS + '.Individual');
    const users = await userRegistry.getAll();
    await userRegistry.removeAll(users);

    const companyRegistry = await getParticipantRegistry(NS + '.Company');
    const companies = await companyRegistry.getAll();
    await companyRegistry.removeAll(companies);
}
