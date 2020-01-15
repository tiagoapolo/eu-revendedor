export function getCreds() {
  return localStorage.getItem("@boti-app")
}

export function saveCreds(value) {
  localStorage.setItem("@boti-app", value)
}

export function removeCreds() {
  localStorage.removeItem("@boti-app")
}
