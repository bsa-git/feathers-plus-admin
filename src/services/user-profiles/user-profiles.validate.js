
/* eslint quotes: 0 */
// Validation definitions for validateSchema hook for service `userProfiles`. (Can be re-generated.)
const { validateSchema } = require('feathers-hooks-common');
const merge = require('lodash.merge');
const ajv = require('ajv');
// !code: imports
//---------------
const {getRegex} = require('../../plugins/lib');
//---------------
// !end
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
        format: "phone",
        faker: "phone.phoneNumberFormat"
      },
      personalWebSite: {
        type: "string",
        format: "uri",
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
        format: "zip_code",
        faker: "address.zipCode"
      },
      addressLatitude: {
        type: "string",
        format: "lat",
        faker: "address.latitude"
      },
      addressLongitude: {
        type: "string",
        format: "long",
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
        format: "phone",
        faker: "phone.phoneNumberFormat"
      },
      jobWebSite: {
        type: "string",
        format: "uri",
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
  // !code: func_create
  //-------------------
  const _ajv = addAjvFormats(options);
  return validateSchema(create, _ajv);
  //-------------------
  // !end
};

let validateUpdate = options => {
  // !code: func_update
  //-------------------
  const _ajv = addAjvFormats(options);
  return validateSchema(update, _ajv);
  //-------------------
  // !end
};

let validatePatch = options => {
  // !code: func_patch
  //-------------------
  const _ajv = addAjvFormats(options);
  return validateSchema(patch, _ajv);
  //-------------------
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
// !code: validate_change
//-----------------------
/**
 * Add ajv formats
 * @param options
 * @return {ajv | ajv.Ajv}
 */
const addAjvFormats = (options) => {
  let _options = { allErrors: true};
  Object.assign(_options, options);
  const _ajv = new ajv(_options);
  // Add formats
  _ajv.addFormat('phone', getRegex('phone'));
  _ajv.addFormat('zip_code', getRegex('zip_code'));
  _ajv.addFormat('lat', getRegex('lat'));
  _ajv.addFormat('long', getRegex('long'));
  return _ajv;
};
//-----------------------
// !end

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
