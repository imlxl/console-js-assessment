/**
 * Example problem with existing solution and passing test.
 * See problem 0 in the spec file for the assertion
 * @returns {string}
 */
exports.example = () => "hello world";

exports.stripPrivateProperties = (stripData, data) => {
  return data.map((item) => {
    let ans = {};
    const obj = Object.entries(item).filter(
      ([key]) => !stripData.includes(key)
    );
    obj.map(([key, value]) => {
      ans[key] = value;
    });
    return ans;
  });
};
exports.excludeByProperty = (exclude, data) => {
  return data.filter((item) => {
    return !(exclude in item);
  });
};
exports.sumDeep = (data) => {
  return data.map((item) => {
    const obj = item.objects;
    let total = 0;
    for (let i = 0; i < obj.length; i++) {
      total += obj[i] && obj[i].val;
    }
    return {
      objects: total,
    };
  });
};
exports.applyStatusColor = (colorData, arr) => {
  let mp = new Map();

  Object.entries(colorData).map(([key, value]) => {
    if (!value.length) return;
    value.map((item) => {
      mp.set(item, key);
    });
  });

  return arr
    .map((item) => {
      const currentColor = mp.get(item.status);
      if (currentColor) {
        item.color = currentColor;
      }
      return item;
    })
    .filter((item) => item.color);
};
exports.createGreeting = (fn, x) => (y) => {
  return `${x} ${y}`;
};
exports.setDefaults = setDefaults = (x) => (y) => {
  Object.entries(x).map(([key, value]) => {
    if (!(key in y)) {
      y[key] = value;
    }
  });
  return y;
};

exports.fetchUserByNameAndUsersCompany = async (userName, services) => {
  let ans = {};
  let [status, users] = await Promise.all([
    services.fetchStatus(),
    services.fetchUsers(),
  ]);
  ans.status = status;

  let userCompanyId = null;
  users.map((item) => {
    if (item.name == userName) {
      ans.user = item;
      userCompanyId = item.companyId;
    }
  });

  ans.company = await services.fetchCompanyById(userCompanyId);
  return ans;
};
