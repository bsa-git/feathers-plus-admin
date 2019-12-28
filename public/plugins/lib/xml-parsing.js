import _isPlainObject from 'lodash/isPlainObject';
import _size from 'lodash/size';
import _values from  'lodash/values';
import _reduce from  'lodash/reduce';
import _each from  'lodash/each';
import _has from  'lodash/has';
import _isArray from  'lodash/isArray';
import _isEmpty from  'lodash/isEmpty';

// flattens an object (recursively!), similarly to Array#flatten
// e.g. flatten({ a: { b: { c: "hello!" } } }); // => "hello!"
function flatten(object) {
  var check = _isPlainObject(object) && _size(object) === 1;
  return check ? flatten(_values(object)[0]) : object;
}

function parse(xml) {
  var data = {};

  var isText = xml.nodeType === 3,
    isElement = xml.nodeType === 1,
    body = xml.textContent && xml.textContent.trim(),
    hasChildren = xml.children && xml.children.length,
    hasAttributes = xml.attributes && xml.attributes.length;

  // if it's text just return it
  if (isText) { return xml.nodeValue.trim(); }

  // if it doesn't have any children or attributes, just return the contents
  if (!hasChildren && !hasAttributes) { return body; }

  // if it doesn't have children but _does_ have body content, we'll use that
  if (!hasChildren && body.length) { data.text = body; }

  // if it's an element with attributes, add them to data.attributes
  if (isElement && hasAttributes) {
    data.attributes = _reduce(xml.attributes, function(obj, name, id) {
      var attr = xml.attributes.item(id);
      obj[attr.name] = attr.value;
      return obj;
    }, {});
  }

  // recursively call #parse over children, adding results to data
  _each(xml.children, function(child) {
    var name = child.nodeName;

    // if we've not come across a child with this nodeType, add it as an object
    // and return here
    if (!_has(data, name)) {
      data[name] = parse(child);
      return;
    }

    // if we've encountered a second instance of the same nodeType, make our
    // representation of it an array
    if (!_isArray(data[name])) { data[name] = [data[name]]; }

    // and finally, append the new child
    data[name].push(parse(child));
  });

  // if we can, let's fold some attributes into the body
  _each(data.attributes, function(value, key) {
    if (data[key] != null) { return; }
    data[key] = value;
    delete data.attributes[key];
  });

  // if data.attributes is now empty, get rid of it
  if (_isEmpty(data.attributes)) { delete data.attributes; }

  // simplify to reduce number of final leaf nodes and return
  return flatten(data);
}

export default function (xml) {
  // use the DOMParser browser API to convert text to a Document
  const XML = new DOMParser().parseFromString(xml, 'text/xml');

  // and then use #parse to convert it to a JS object
  const obj = parse(XML);
  return obj;
}
