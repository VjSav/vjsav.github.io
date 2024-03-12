
namespace AreaLib
{
    /// <summary>Для определения площади фигуры без знания типа фигуры
    /// </summary>
    public class Shape : IShape
    {
        private readonly IShape shape;
        public double Area => shape.Area;

        public Shape(IShape figure)
        {
            shape = figure;
        }
    }
}
