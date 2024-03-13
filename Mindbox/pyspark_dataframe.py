
from pyspark.sql import SparkSession

spark = SparkSession.builder.appName("dataframes_task").getOrCreate()

categories_table = spark.createDataFrame(
    [
    (1, "Category 1"),
    (2, "Category 2"),
    (3, "Category 3"),
    (4, "Category 4"),
    (5, "Category 5"),
    ],
    ["id", "category_name"],
)

products_table = spark.createDataFrame(
    [
    (1, "Product 1"),
    (2, "Product 2"),
    (3, "Product 3"),
    (4, "Product 4"),
    (5, "Product 5"),
    ],
    ["id", "product_name", ]
)

index_table = spark.createDataFrame(
    [
    (1, 1),
    (2, 2),
    (4, 3),
    (4, 4),
    (5, 5)
    ],
    ["product_id", "category_id"]
)

data = (
            products_table.join(index_table, products_table.id == index_table.product_id, how='left')
            .join(categories_table, index_table.category_id == categories_table.id, how='left')
            .select(['product_name', 'category_name']
            )
)

data.orderBy("category_id", "product_id", ).show()