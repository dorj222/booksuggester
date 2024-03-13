export default function GetAuthors(response) {
    let fullName = "";
    fullName = response.map(function (x, index) {
      const countComma = (x.name.match(/,/g) || []).length;
      if (!x.name.includes("(") && !x.name.includes(")") && (countComma === 1)) {
        let nameArray = x.name.split(', ');
        if (index + 1 === response.length) {
          fullName = nameArray[1] + " " + nameArray[0];
        } else {
          fullName = nameArray[1] + " " + nameArray[0] + ", "
        }
      } else {
        fullName = x.name;
      }
      return fullName;
    });
    return fullName;
  }