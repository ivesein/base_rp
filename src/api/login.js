import service from "@/utils/service";

export function login(data) {
  return service({
    url: "/login/",
    method: "post",
    data,
  });
}
