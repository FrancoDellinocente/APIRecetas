

export const getDefault = async (req, res) => {
  try {
    res.json({
      msg: "Bienvenido A La API!",
      description: "Esta Es Una API Para Proyecto de recetas",
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error });
  }
};