-- Seed departments first (4 departments as requested)
INSERT INTO departments (name, code) VALUES
('Technologie de l''information', 'TI'),
('Génie Mécanique', 'GM'),
('Génie Civil', 'GC'),
('Génie Électrique', 'GE')
ON CONFLICT (code) DO NOTHING;

-- Get department IDs
DO $$
DECLARE
  ti_dept_id UUID;
  gm_dept_id UUID;
  gc_dept_id UUID;
  ge_dept_id UUID;
  admin_id UUID;
  ti_director_id UUID;
  gm_director_id UUID;
  gc_director_id UUID;
  ge_director_id UUID;
BEGIN
  -- Get department IDs
  SELECT id INTO ti_dept_id FROM departments WHERE code = 'TI';
  SELECT id INTO gm_dept_id FROM departments WHERE code = 'GM';
  SELECT id INTO gc_dept_id FROM departments WHERE code = 'GC';
  SELECT id INTO ge_dept_id FROM departments WHERE code = 'GE';

  -- Create Admin User
  INSERT INTO users (email, password_hash, first_name, last_name, role, department_id)
  VALUES ('admin@university.edu', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36ZxQrCa', 'Admin', 'System', 'admin', NULL)
  ON CONFLICT (email) DO NOTHING;
  
  SELECT id INTO admin_id FROM users WHERE email = 'admin@university.edu';

  -- ===== TECHNOLOGIE DE L'INFORMATION =====
  -- Director TI
  INSERT INTO users (email, password_hash, first_name, last_name, role, department_id)
  VALUES ('director.ti@university.edu', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36ZxQrCa', 'Haithem', 'Hafsi', 'director', ti_dept_id)
  ON CONFLICT (email) DO NOTHING;
  
  SELECT id INTO ti_director_id FROM users WHERE email = 'director.ti@university.edu';
  UPDATE departments SET director_id = ti_director_id WHERE id = ti_dept_id;

  -- Teachers TI
  INSERT INTO users (email, password_hash, first_name, last_name, role, department_id)
  VALUES 
    ('teacher.ti1@university.edu', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36ZxQrCa', 'Souhir', 'HEDFI', 'teacher', ti_dept_id),
    ('teacher.ti2@university.edu', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36ZxQrCa', 'Iftikhar', 'CHETOUI', 'teacher', ti_dept_id),
    ('teacher.ti3@university.edu', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36ZxQrCa', 'Rana', 'RHILI', 'teacher', ti_dept_id),
    ('teacher.ti4@university.edu', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36ZxQrCa', 'Taheya', 'BACCARI', 'teacher', ti_dept_id),
    ('teacher.ti5@university.edu', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36ZxQrCa', 'Ibrahim', 'CHRAIT', 'teacher', ti_dept_id)
  ON CONFLICT (email) DO NOTHING;

  -- Students TI
  INSERT INTO users (email, password_hash, first_name, last_name, role, department_id)
  VALUES 
    ('student.ti1@university.edu', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36ZxQrCa', 'Yassine', 'Ben Ahmed', 'student', ti_dept_id),
    ('student.ti2@university.edu', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36ZxQrCa', 'Amina', 'Khalil', 'student', ti_dept_id),
    ('student.ti3@university.edu', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36ZxQrCa', 'Mohamed', 'Triki', 'student', ti_dept_id),
    ('student.ti4@university.edu', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36ZxQrCa', 'Hana', 'Zahra', 'student', ti_dept_id),
    ('student.ti5@university.edu', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36ZxQrCa', 'Ali', 'Tounsi', 'student', ti_dept_id)
  ON CONFLICT (email) DO NOTHING;

  -- ===== GÉNIE MÉCANIQUE =====
  -- Director GM
  INSERT INTO users (email, password_hash, first_name, last_name, role, department_id)
  VALUES ('director.gm@university.edu', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36ZxQrCa', 'Hassen', 'CHRAYGA', 'director', gm_dept_id)
  ON CONFLICT (email) DO NOTHING;
  
  SELECT id INTO gm_director_id FROM users WHERE email = 'director.gm@university.edu';
  UPDATE departments SET director_id = gm_director_id WHERE id = gm_dept_id;

  -- Teachers GM
  INSERT INTO users (email, password_hash, first_name, last_name, role, department_id)
  VALUES 
    ('teacher.gm1@university.edu', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36ZxQrCa', 'Tawfik', 'Zouaghi', 'teacher', gm_dept_id),
    ('teacher.gm2@university.edu', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36ZxQrCa', 'Mansouri', 'Ahmed', 'teacher', gm_dept_id),
    ('teacher.gm3@university.edu', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36ZxQrCa', 'Benchikh', 'Riad', 'teacher', gm_dept_id),
    ('teacher.gm4@university.edu', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36ZxQrCa', 'Jadi', 'Nemri', 'teacher', gm_dept_id),
    ('teacher.gm5@university.edu', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36ZxQrCa', 'Amoussi', 'Farah', 'teacher', gm_dept_id)
  ON CONFLICT (email) DO NOTHING;

  -- Students GM
  INSERT INTO users (email, password_hash, first_name, last_name, role, department_id)
  VALUES 
    ('student.gm1@university.edu', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36ZxQrCa', 'Karim', 'Mechani', 'student', gm_dept_id),
    ('student.gm2@university.edu', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36ZxQrCa', 'Fatima', 'Saleh', 'student', gm_dept_id),
    ('student.gm3@university.edu', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36ZxQrCa', 'Amir', 'Bouaziz', 'student', gm_dept_id),
    ('student.gm4@university.edu', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36ZxQrCa', 'Leila', 'Moradi', 'student', gm_dept_id),
    ('student.gm5@university.edu', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36ZxQrCa', 'Nadir', 'Bahri', 'student', gm_dept_id)
  ON CONFLICT (email) DO NOTHING;

  -- ===== GÉNIE CIVIL =====
  -- Director GC
  INSERT INTO users (email, password_hash, first_name, last_name, role, department_id)
  VALUES ('director.gc@university.edu', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36ZxQrCa', 'Abdelaziz', 'BEN NASR', 'director', gc_dept_id)
  ON CONFLICT (email) DO NOTHING;
  
  SELECT id INTO gc_director_id FROM users WHERE email = 'director.gc@university.edu';
  UPDATE departments SET director_id = gc_director_id WHERE id = gc_dept_id;

  -- Teachers GC
  INSERT INTO users (email, password_hash, first_name, last_name, role, department_id)
  VALUES 
    ('teacher.gc1@university.edu', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36ZxQrCa', 'Rekik', 'Hassan', 'teacher', gc_dept_id),
    ('teacher.gc2@university.edu', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36ZxQrCa', 'Belgacem', 'Zahra', 'teacher', gc_dept_id),
    ('teacher.gc3@university.edu', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36ZxQrCa', 'Haddad', 'Slimane', 'teacher', gc_dept_id),
    ('teacher.gc4@university.edu', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36ZxQrCa', 'Chouqui', 'Mohamed', 'teacher', gc_dept_id),
    ('teacher.gc5@university.edu', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36ZxQrCa', 'Ellouch', 'Hassan', 'teacher', gc_dept_id)
  ON CONFLICT (email) DO NOTHING;

  -- Students GC
  INSERT INTO users (email, password_hash, first_name, last_name, role, department_id)
  VALUES 
    ('student.gc1@university.edu', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36ZxQrCa', 'Omar', 'Civil', 'student', gc_dept_id),
    ('student.gc2@university.edu', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36ZxQrCa', 'Zahra', 'Kadri', 'student', gc_dept_id),
    ('student.gc3@university.edu', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36ZxQrCa', 'Samir', 'Construction', 'student', gc_dept_id),
    ('student.gc4@university.edu', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36ZxQrCa', 'Nadia', 'Brahim', 'student', gc_dept_id),
    ('student.gc5@university.edu', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36ZxQrCa', 'Hassan', 'Azab', 'student', gc_dept_id)
  ON CONFLICT (email) DO NOTHING;

  -- ===== GÉNIE ÉLECTRIQUE =====
  -- Director GE
  INSERT INTO users (email, password_hash, first_name, last_name, role, department_id)
  VALUES ('director.ge@university.edu', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36ZxQrCa', 'Imed', 'LASSOUED', 'director', ge_dept_id)
  ON CONFLICT (email) DO NOTHING;
  
  SELECT id INTO ge_director_id FROM users WHERE email = 'director.ge@university.edu';
  UPDATE departments SET director_id = ge_director_id WHERE id = ge_dept_id;

  -- Teachers GE
  INSERT INTO users (email, password_hash, first_name, last_name, role, department_id)
  VALUES 
    ('teacher.ge1@university.edu', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36ZxQrCa', 'Ben Hamed', 'Youssef', 'teacher', ge_dept_id),
    ('teacher.ge2@university.edu', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36ZxQrCa', 'Houmia', 'Mohamed', 'teacher', ge_dept_id),
    ('teacher.ge3@university.edu', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36ZxQrCa', 'Takriuni', 'Ahmed', 'teacher', ge_dept_id),
    ('teacher.ge4@university.edu', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36ZxQrCa', 'Boubaker', 'Wajdi', 'teacher', ge_dept_id),
    ('teacher.ge5@university.edu', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36ZxQrCa', 'Saidi', 'Zaineb', 'teacher', ge_dept_id)
  ON CONFLICT (email) DO NOTHING;

  -- Students GE
  INSERT INTO users (email, password_hash, first_name, last_name, role, department_id)
  VALUES 
    ('student.ge1@university.edu', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36ZxQrCa', 'Khaled', 'Electric', 'student', ge_dept_id),
    ('student.ge2@university.edu', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36ZxQrCa', 'Mariam', 'Cirkit', 'student', ge_dept_id),
    ('student.ge3@university.edu', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36ZxQrCa', 'Nizar', 'Charge', 'student', ge_dept_id),
    ('student.ge4@university.edu', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36ZxQrCa', 'Layla', 'Akbar', 'student', ge_dept_id),
    ('student.ge5@university.edu', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36ZxQrCa', 'Rashed', 'Energy', 'student', ge_dept_id)
  ON CONFLICT (email) DO NOTHING;

END $$;
