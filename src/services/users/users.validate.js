
/* eslint quotes: 0 */
// Validation definitions for validateSchema hook for service `users`. (Can be re-generated.)
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
    title: "Users",
    description: "Users database.",
    fakeRecords: 3,
    required: [],
    uniqueItemProperties: [
      "email",
      "profileId"
    ],
    properties: {
      id: {
        type: ID
      },
      _id: {
        type: ID
      },
      email: {
        type: "string",
        format: "email",
        minLength: 8,
        maxLength: 40,
        faker: "internet.email"
      },
      password: {
        type: "string",
        faker: {
          exp: "rec.email.slice(0, rec.email.indexOf(\"@\"))"
        }
      },
      firstName: {
        type: "string",
        minLength: 2,
        maxLength: 20,
        faker: "name.firstName"
      },
      lastName: {
        type: "string",
        minLength: 2,
        maxLength: 40,
        faker: "name.lastName"
      },
      avatar: {
        type: "string",
        faker: "internet.avatar"
      },
      roleId: {
        type: ID,
        faker: {
          fk: "roles:random"
        }
      },
      profileId: {
        type: ID,
        faker: {
          fk: "userProfiles:next"
        }
      },
      active: {
        type: "boolean"
      },
      isVerified: {
        type: "boolean"
      },
      verifyToken: {
        type: "string"
      },
      verifyShortToken: {
        type: "string"
      },
      verifyExpires: {
        type: "string",
        format: "date-time"
      },
      verifyChanges: {
        type: "object"
      },
      resetToken: {
        type: "string"
      },
      resetShortToken: {
        type: "string"
      },
      resetExpires: {
        type: "string",
        format: "date-time"
      },
      googleId: {
        type: "string",
        chance: "natural"
      },
      githubId: {
        type: "string",
        chance: "natural"
      },
      googleAccessToken: {
        type: "string",
        chance: "guid"
      },
      googleRefreshToken: {
        type: "string",
        chance: "guid"
      },
      githubAccessToken: {
        type: "string",
        chance: "guid"
      },
      githubRefreshToken: {
        type: "string",
        chance: "guid"
      },
      loginAt: {
        type: "string",
        format: "date-time"
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

// !code: exports
moduleExports.schema = base;
// !end
module.exports = moduleExports;

// !code: funcs // !end
// !code: end // !end
