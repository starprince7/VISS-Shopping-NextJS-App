export function generateId(param?: GenerateIdParam) {
  if (param) {
    const id = Math.floor(1000 + Math.random() * 9000)
      .toString()
      .padStart(6, "1");

    return (
      `${(param.prefix ? param.prefix : "").trim() 
      }_${ 
      id 
      }_${ 
      (param.suffix ? param.suffix : "").trim()}`
    );
  }

  const id = Math.floor(1000 + Math.random() * 9000)
    .toString()
    .padStart(6, "1");

  return id;
}

type GenerateIdParam = {
  prefix?: string;
  suffix?: string;
};
