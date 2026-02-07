const products = [
    {
      id: "fc-1888",
      name: "Flux capacitor",
      averagerating: 4.5
    },
    {
      id: "fc-2050",
      name: "Power laces",
      averagerating: 4.7
    },
    {
      id: "fs-1987",
      name: "Time circuits",
      averagerating: 3.5
    },
    {
      id: "ac-2000",
      name: "Low voltage reactor",
      averagerating: 3.9
    },
    {
      id: "jj-1969",
      name: "Warp equalizer",
      averagerating: 5.0
    }
];

document.addEventListener("DOMContentLoaded", () => {
    const productSelect = document.getElementById("productName");

    // Populate Product Name options
    products.forEach(product => {
        const option = document.createElement("option");
        option.value = product.id; // Requirement: array's id is used for the value field
        option.textContent = product.name; // Requirement: array's name field is used for display
        productSelect.appendChild(option);
    });

    // Footer: Current Year and Last Modified
    document.getElementById("currentyear").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = `Last Modification: ${document.lastModified}`;
});
