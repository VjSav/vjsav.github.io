SELECT c.id, c.name, s.name as sub_name, s.id as sub_id, 
(select top 1 len(REPLACE(value, '.', '')) from string_split(s.name,' ') order by len(value))  AS sub_level,
count(subdivision_id) OVER(PARTITION BY subdivision_id) AS colls_count

FROM collaborators c
JOIN subdivisions s ON (c.subdivision_id = s.id)
WHERE [age] < 40
ORDER BY sub_level desc 


