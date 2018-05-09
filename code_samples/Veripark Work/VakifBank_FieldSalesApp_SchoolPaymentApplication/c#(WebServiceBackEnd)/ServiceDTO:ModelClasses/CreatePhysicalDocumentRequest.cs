using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VakifBank.DSA.YHB.MobileApi.Messages.Core;
using VakifBank.DSA.YHB.MobileApi.Messages.SahaSatisInbound.Entities;

namespace VakifBank.DSA.YHB.MobileApi.Messages.SOkulTahsilatMobilSahaSatis
{
    public class CreatePhysicalDocumentRequest : IRequestData
    {
        public string AccountNumber { get; set; }
        public string EducationPeriod { get; set; }
        public bool GiveCreditLimit { get; set; }
        public string GuardianFirstName { get; set; }
        public string GuardianIdentityNumber { get; set; }
        public string GuardianLastName { get; set; }
        public int IntelligenceResult { get; set; }
        public bool IntelligenceStatus { get; set; }
        public bool IsGuardian { get; set; }
        public long PaymentDefinitionId { get; set; }
        public long SchoolDefinitionId { get; set; }
        public List<SchoolPayment> SchoolPayments { get; set; }
        public int SchoolType { get; set; }
        public string StudentFirstName { get; set; }
        public string StudentIdentityNumber { get; set; }
        public string StudentLastName { get; set; }
        public string StudentNumber { get; set; }
    }
}
