import MyRequest from "@/service/axios";

console.log("MyRequest: ", MyRequest);

function getExercises() {
  return MyRequest.get({
    url: "/api/getExercises",
  });
}
function getPicture(picturePath: string) {
  return MyRequest.get({
    url: "/api/getPicture",
    data: picturePath,
  });
}

export { getExercises, getPicture };
