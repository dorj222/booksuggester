export default function GetRepsonse(response) {
    let tempResponse = "";
    response.forEach(function (item, index) {
      if (index < 2) {
        item = item.replace(/--/g, '');
        if (index + 1 === response.length || index + 1 === 2) {
          tempResponse = tempResponse + item;
        } else {
          tempResponse = tempResponse + item + "; ";
        }
      }
    });
    return tempResponse;
  }