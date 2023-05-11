/**
 * Фабрика, которая решает проблему необходимости 
 * указания большого количества декораторов
 * для валидации полей объекта
 * 
 * язык: TypeScript
 * фреймворк: NestJs
 */

export class Validate {
    private static getOptions<T extends ValidationType>(
      options: Options[T],
      type?: ValidationType,
      objectType?: any,
    ): RootOption {
      if (!options?.apiProperty) options.apiProperty = {} as ApiPropertyOptions;
      const opt = options as RootOption;
      opt.type = type;
      opt.objectType = objectType;
  
      return opt;
    }
  
    static UUID(options: Options['uuid']) {
      const opt = Validate.getOptions(options, 'uuid');
      const decorates = [...defaultValidateDecorations(opt)];
  
      // ======--- Options ---======
  
      return applyDecorators(...decorates);
    }
  
    static Enum(options: Options['enum']) {
      const opt = Validate.getOptions(options, 'enum');
      opt.apiProperty.enum = options?.enum;
      const decorates = [...defaultValidateDecorations(opt)];
  
      // ======--- Options ---======
      if (options?.enum) decorates.push(IsEnum(options.enum));
  
      return applyDecorators(...decorates);
    }
  
    static String(options: Options['string']) {
      const opt = Validate.getOptions(options, 'string');
      const decorates = [...defaultValidateDecorations(opt)];
  
      // ======--- Options ---======
      if (options?.maxLength) decorates.push(MaxLength(options.maxLength));
      if (options?.minLength) decorates.push(MinLength(options.minLength));
      if (options?.notEmpty ?? true) decorates.push(IsNotEmpty());
      if (options?.isEmail) decorates.push(IsEmail());
      if (options?.isPhone) decorates.push(IsPhoneNumber());
      if (options?.upperCase) decorates.push(Transform(toUpperCase));
      if (options?.lowerCase) decorates.push(Transform(toLowerCase));
  
      return applyDecorators(...decorates);
    }
  
    static Number(options: Options['number']) {
      const opt = Validate.getOptions(options, 'number');
      const decorates = [...defaultValidateDecorations(opt)];
  
      // ======--- Options ---======
      if (options?.max) decorates.push(Max(options.max));
      if (options?.min) decorates.push(Min(options.min));
      if (options?.isInt) decorates.push(IsInt());
      if (options?.isFloat) decorates.push(IsDecimal());
  
      return applyDecorators(...decorates);
    }
    static Boolean(options: Options['boolean']) {
      const opt = Validate.getOptions(options, 'boolean');
      const decorates = [...defaultValidateDecorations(opt)];
  
      // ======--- Options ---======
  
      return applyDecorators(...decorates);
    }
  
    static Date(options: Options['date']) {
      const opt = Validate.getOptions(options, 'date');
      const decorates = [...defaultValidateDecorations(opt)];
  
      // ======--- Options ---======
  
      return applyDecorators(...decorates);
    }
    static Object(options: Options['object']) {
      const opt = Validate.getOptions(options, 'object', options?.type);
      const decorates = [...defaultValidateDecorations(opt)];
  
      // ======--- Options ---======
      decorates.push(ValidateNested());
      if (opt?.objectType) decorates.push(Type(() => opt.objectType));
  
      return applyDecorators(...decorates);
    }
  }