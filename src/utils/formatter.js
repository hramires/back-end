import lattesUrlGenerator from "./lattesUrlConverter.js";

async function format(status, data, key) {
  if (status < 300) {
    return await formatSuccess(status, data, key);
  } else if (status < 500) {
    return await formatExternalError(status, data);
  } else {
    return await formatInternalError(status, data);
  }
}

async function formatSuccess(status, data, key) {
  return { status: status, msg: "Success", [key]: data };
}

async function formatExternalError(status, data) {
  return { status: status, msg: "Bad request", errors: data };
}

async function formatInternalError(status, data) {
  return { status: status, msg: "Internal error occurred", errors: data };
}

async function formatErrors(value, errors) {
  if (value && value instanceof Array) {
    return _formatErrors(value);
  } else if (errors && errors instanceof Array) {
    return _formatErrors(errors);
  }

  return _formatError(value, errors);
}

async function _formatErrors(errors) {
  let formattedErrors = [];
  let value, msg;
  for (let err of errors) {
    if ("msg" in err) {
      msg = err.msg;
    } else {
      msg = err.message;
    }

    if ("param" in err) {
      value = err.param;
    } else if ("value" in err) {
      value = err.value;
    } else {
      value = "";
    }

    formattedErrors.push({ value, msg });
  }
  return formattedErrors;
}

async function _formatError(value, msg) {
  if (!msg) return [{ value: "", msg: value }];
  return [{ value, msg }];
}

export default {
  format,
  formatErrors,
};
