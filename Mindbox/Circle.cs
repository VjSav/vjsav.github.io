
using System;

namespace AreaLib
{
    public class Circle : IShape
    {
        public int Radius { get; set; } = default;

        public Circle()
        { }
        public Circle(int radius)
        {
            Radius = radius;
        }
        public double Area => Math.PI * Radius * Radius;

    }
}
