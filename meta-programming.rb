

class Object
  def self.sdg_attr(name)
    define_method(name) do
      self.instance_variable_get("@#{name}")
    end

    define_method("#{name}=") do |value|
      self.instance_variable_set("@#{name}", value)
    end
  end
end

class Foo
  sdg_attr :name
end

