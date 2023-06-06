export function fetchProducts(req, res) {
  try {
    return res.status(200).json({ message: "Hi!" });
  } catch (error) {
    return res.status(400).json({ message: "Hi!" });
  }
}

export function getProducts(req, res) {
  return "hi";
}
