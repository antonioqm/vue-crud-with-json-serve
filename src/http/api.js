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
export async function editPerson (person) {
  const {id} = person
  return axios.put(`http://localhost:3000/person/${id}`, person)
    .then(response => {
      console.log("editando no server", person)
      return response.data
    })
}
export async function removePerson (person) {
  const {id} = person
  return axios.delete(`http://localhost:3000/person/${id}`)
    .then(async (response) => {
      return {id}
    })
}

