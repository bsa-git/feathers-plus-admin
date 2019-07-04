
/* eslint quotes: 0 */
// Validation definitions for validateSchema hook for service `userProfiles`. (Can be re-generated.)
const { validateSchema } = require('feathers-hooks-common');
const merge = require('lodash.merge');
const ajv = require('ajv');
// !code: imports // !end
// !code: init // !end

// !<DEFAULT> code: set_id_type
// eslint-disable-next-line no-unused-vars
const ID = 'string';
// !end

let base = merge({},
  // !<DEFAULT> code: base
  {
    title: "UserProfiles",
    description: "UserProfiles database.",
    fakeRecords: 3,
    required: [],
    uniqueItemProperties: [],
    properties: {
      id: {
        type: ID
      },
      _id: {
        type: ID
      },
      personalPhone: {
        type: "string",
        faker: "phone.phoneNumberFormat"
      },
      personalWebSite: {
        type: "string",
        faker: "internet.url"
      },
      addressSuite: {
        type: "string",
        faker: "address.secondaryAddress"
      },
      addressStreet: {
        type: "string",
        faker: "address.streetAddress"
      },
      addressCity: {
        type: "string",
        faker: "address.city"
      },
      addressState: {
        type: "string",
        faker: "address.state"
      },
      addressStateAbbr: {
        type: "string",
        faker: "address.stateAbbr"
      },
      addressCountry: {
        type: "string",
        faker: "address.country"
      },
      addressCountryCode: {
        type: "string",
        faker: "address.countryCode"
      },
      addressZipCode: {
        type: "string",
        faker: "address.zipCode"
      },
      addressLatitude: {
        type: "string",
        faker: "address.latitude"
      },
      addressLongitude: {
        type: "string",
        faker: "address.longitude"
      },
      jobCompanyName: {
        type: "string",
        faker: "company.companyName"
      },
      jobTitle: {
        type: "string",
        faker: "name.jobTitle"
      },
      jobType: {
        type: "string",
        faker: "name.jobType"
      },
      jobPhone: {
        type: "string",
        faker: "phone.phoneNumberFormat"
      },
      jobWebSite: {
        type: "string",
        faker: "internet.url"
      },
      jobEmail: {
        type: "string",
        format: "email",
        minLength: 8,
        maxLength: 40,
        faker: "internet.exampleEmail"
      }
    }
  },
  // !end
  // !code: base_more // !end
);
// !code: base_change // !end

let create = merge({},
  base,
  // !code: create_more // !end
);

let update = merge({},
  base,
  // !code: update_more // !end
);

let patch = merge({},
  base,
  // !code: patch_more // !end
);
delete patch.required;
// !code: all_change // !end

let validateCreate = options => {
  // !<DEFAULT> code: func_create
  return validateSchema(create, ajv, options);
  // !end
};

let validateUpdate = options => {
  // !<DEFAULT> code: func_update
  return validateSchema(update, ajv, options);
  // !end
};

let validatePatch = options => {
  // !<DEFAULT> code: func_patch
  return validateSchema(patch, ajv, options);
  // !end
};

let quickValidate = (method, data, options) => {
  try {
    if (method === 'create') { validateCreate(options)({ type: 'before', method: 'create', data }); }
    if (method === 'update') { validateCreate(options)({ type: 'before', method: 'update', data }); }
    if (method === 'patch') { validateCreate(options)({ type: 'before', method: 'patch', data }); }
  } catch (err) {
    return err;
  }
};
// !code: validate_change // !end

let moduleExports = {
  create,
  update,
  patch,
  validateCreate,
  validateUpdate,
  validatePatch,
  quickValidate,
  // !code: moduleExports // !end
};

// !code: exports // !end
module.exports = moduleExports;

// !code: funcs // !end
// !code: end // !end
