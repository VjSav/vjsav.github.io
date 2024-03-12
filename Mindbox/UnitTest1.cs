using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using AreaLib;

namespace AreaLibTest
{
    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
        public void CircleAreaEmpty()
        {
            var area = new Circle().Area;
            Assert.AreEqual(area, 0);
        }

        [TestMethod]
        public void CircleAreaOk()
        {
            int radius = 6;
            var area = new Circle(radius).Area;
            var areaOk = Math.PI * radius * radius;
            Assert.AreEqual(area, areaOk);
        }

        [TestMethod]
        public void TriangleAreaEmpty()
        {
            var area = new Triangle().Area;
            Assert.AreEqual(area, 0);
        }

        [TestMethod]
        public void TriangleAreaOk()
        {
            var area = new Triangle(3, 4, 5).Area;
            Assert.AreEqual(area, 6);
        }

        [TestMethod]
        public void TriangleAreaNo()
        {
            var area = new Triangle(3, 4, 8).Area;
            Assert.AreEqual(area, 0);
        }

        [TestMethod]
        public void TriangleIsRightOk()
        {
            bool isRight = new Triangle(3, 4, 5).IsRightTriangle();
            Assert.IsTrue(isRight);
        }

        [TestMethod]
        public void TriangleIsRightNo()
        {
            bool isRight = new Triangle(3, 4, 6).IsRightTriangle();
            Assert.IsTrue(!isRight);
        }


        [TestMethod]
        public void AreaOfShapeCircleEmpty()
        {
            var area = new Shape(new Circle()).Area;
            Assert.AreEqual(area, 0);
        }

        [TestMethod]
        public void AreaOfShapeCircleOk()
        {
            var area = new Shape(new Circle(5)).Area;
            var areaOk = Math.PI * 5 * 5;
            Assert.AreEqual(area, areaOk);
        }

        [TestMethod]
        public void AreaOfShapeTriangleEmpty()
        {
            var area = new Shape(new Triangle()).Area;
            Assert.AreEqual(area, 0);
        }

        [TestMethod]
        public void AreaOfShapeTriangleOk()
        {
            var area = new Shape(new Triangle(3, 4, 5)).Area;
            Assert.AreEqual(area, 6);
        }
    }
}
