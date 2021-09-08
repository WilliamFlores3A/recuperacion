const { API } = require('../config');
const axios = require('axios').default;


exports.create = async (verificacion) => {
    return axios.post(API + '/verificacion', verificacion).then(response => {
        return response.data;
    }).catch(error => {
        console.error(error);
    })
}

exports.get = async (verificacionId) => {
    return axios.get(API + '/verificacion/' + verificacionId).then(response => {
        return response.data;
    });
}

exports.getAll = async () => {
    return axios.get(API + '/verificacion').then(response => {
        return response.data;
    });
};

exports.delete = async (verificacionId) => {
    return axios.delete(API + '/verificacion/' + verificacionId).then(response => {
        return response.data;
    })
}

exports.update = async(verificacionId, verificacion) => {
    return axios.patch(API + '/verificacion/' + verificacionId, verificacion).then(response => {
        return response.data;
    })
}