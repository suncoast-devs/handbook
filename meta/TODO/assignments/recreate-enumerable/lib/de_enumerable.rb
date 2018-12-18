def de_enumerable(collection)
  Enumerable.instance_methods.each { |method| collection.define_singleton_method(method) { raise "You can't use the `#{method}` method!" } }
end

