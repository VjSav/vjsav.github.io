
using System;

namespace AreaLib
{
    public class Triangle : IShape
    {
        public int A { get; set; } = default;
        public int B { get; set; } = default;
        public int C { get; set; } = default;

        public Triangle()
        { }
        public Triangle(int a, int b, int c)
        {
            A = a;
            B = b;
            C = c;
        }
        public double Area
        {
            get
            {
                if (
                    ((A + B) < C) ||
                    ((A + C) < B) ||
                    ((B + C) < A)
                    )
                    return 0;

                var p = (A + B + C) / 2;
                return Math.Sqrt(p * (p - A) * (p - B) * (p - C));
            }
        }


        public bool IsRightTriangle()
        {
            bool isRight =
            A == Math.Sqrt(B * B + C * C)
            ||
            B == Math.Sqrt(A * A + C * C)
            ||
            C == Math.Sqrt(A * A + B * B);

            return isRight;
        }
    }
}
