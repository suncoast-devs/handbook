def bubble_sort(array)
 loop do
   sorted = true
   (0...array.length).each_cons(2) do |first,second|
     array
     [first, second, array[first], array[second]]
     if array[first] > array[second]
       array[first], array[second] = array[second], array[first]
       sorted = false
     end
   end
   break if sorted
 end
end

array = [7,1,2,9,4,5]
bubble_sort(array)
p array
