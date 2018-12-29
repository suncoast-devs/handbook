Dir["**/*.md"].each do |md|
  file = File.open(md).read
  matches = file.scan(/^# /)
  if matches.count == 1
    puts md unless file.index(/^# /) == 0
  else
    puts md
  end
end
