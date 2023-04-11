import admin from "firebase-admin";
import config from "../config/index.mjs";

const serviceAccount = {
  type: "service_account",
  project_id: "badbank-b611f",
  private_key_id: "ab288e4879aa2d520e91f932cb45f19b89a1c1f9",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCuNjAUymrXYFnV\nEuBB3+MyLF1JYvA7pKrPGOM4p0aRztNUcyPmwPRCVIGCJcsghKvyRn+KklOy6COt\nTjvmQtIh7ibaU3PUKBdd+7DNBoRhtBDts2SVkfoDhvbc9aFM6Yr4+0uhrbLpm7Xa\nKuhbaPV11irjqplWyiURIQ+LCq605JODYN5eRGHPZt6BalOJSZJ4s4BMgB3RiYGV\nxYhkINqUruOmbf7r8otqcEj5xSUwULwHDUCU4ITHdoquwweeJKET8bfM7dKZvz6H\noqLYdGP/S09yAXTkEOg7JOBUvo+TwTepxo1qVj6bw+26cDssjKCY5ti22Hcsb6rV\nQ/yyEd/BAgMBAAECggEAG+3ii/a+pbxT8pHF47G72BeeNg13U6yM2MpV5UeGDAqz\nPTL/Yrd1AWxQXffmppY2hc8xE9ttMT2/uIFWH45/Z0Kptm9SHsV1p5LaD6iXkR1f\n6GfN/J+sTCP3UEnN3AmGBvAsuiUhjYux3iHqYftD/OoCssCvOCeMxT/+YK1sAGJv\nbTkrdlIj1UnqB90v53LTNjO9lmDAuyK2LOwH0gXrzQTU/EUzfGdEq2U2kZCM3ErI\nN/Fu+C+YD6+F019v1uyXNpHNG5T52dHFFY2TGwa3hnp/axVWUrC8X4DyeDxPVjO5\nBJn0mMA7h3tnQfu/asMSC0LxVgfkGO47WC5K3zs7RQKBgQDzxptalZnKj3ivB8nz\nPIKdlta3KSYP+GiTGAkz3lceb1evA/GJjfDZYgGw5Nef8eHAv2Komdw3bgStipBX\nTFhXMz4xEraDKGcTo0sSl3qLuNUZwUB3r+U/B60X5D+ifnflr1yQiKNa3kA0lWZU\n4yRBw/8fNk98Sgofb05Gor4EJQKBgQC28pLnT2j3GsFQqPHUMjnBfTd46yg5c9sQ\nCfV/VlMcWPrJt6MEMalk09k2G7XtQ10wRNrFpn34ZJuuNEdepPVb6QWMNmK3/jvW\n0uehr0m8wxbzNsAptmCRkSUG46npKogPw4Hqcbt1mQ20QAE76YfUrCFT75+COcfk\n95soAnjsbQKBgQCBhNAdvMZNPRUdycGenlO3buD9x7sVWSIWpPqeuE8JOJcZwbqf\nHu8MUGodljiKHnWXdxfwBG9gc+/AVJKED2gQTIWKhSq7XMgHQwcsBZdyjO2MFYUv\nEiF275kjzH2S1CbXvegsUqyYJuVuCsKn71bgKkZuSujIXH4sXXL1TJowkQKBgC3v\nNBFd7+XzUsx0zttPjQ7W6MG0kZHzU/Jv/bLuMsnwUW+qawTXj0egpW4fgQtEmbZP\n43oy9ngSksAnoi/STUS5ekodMaYu8EldBQmkoGgDt9RzT8ZpY0/JWLmlGflQU39Z\nwFnkGoRJXJaAZ47qcM9mNKwFg1BIP7dusAdYr5H1AoGBAJXj3RVE5OeYJUpvkhyE\nLNEZsHy8xOljGoY2RQ4Hzi834QFtwKUsZa7Xh9TuWM5ldW+Nh3GaVry/atvZ/QLI\nSZPwLWYy9Pnk1m5IrFq5zCdZmkY+i7s1MUF7lm5zeLylB6nmt8eel2ZuqasAFA9D\nh5QSwWyHoJIzxg3W1+VElFFC\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-70xlq@badbank-b611f.iam.gserviceaccount.com",
  client_id: "101109911048281306818",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-70xlq%40badbank-b611f.iam.gserviceaccount.com"
};

const firebase = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export default {
  auth: firebase.auth()
};