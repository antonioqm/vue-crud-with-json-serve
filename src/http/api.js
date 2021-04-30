import axios from 'axios'

export function getPeson () {
  return axios.get('http://localhost:3000/person/')
    .then(response => {
      return response.data
    })
}

export async function createPerson (person) {
  return axios.post('http://localhost:3000/person', person)
    .then(response => {
      console.log(person)
      return response.data
    })
}

